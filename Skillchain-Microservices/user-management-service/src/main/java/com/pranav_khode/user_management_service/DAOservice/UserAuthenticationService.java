package com.pranav_khode.user_management_service.DAOservice;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.pranav_khode.user_management_service.DTO.request.OtpResendRequset;
import com.pranav_khode.user_management_service.DTO.request.OtpVerificationRequest;
import com.pranav_khode.user_management_service.DTO.request.UserLoginRequest;
import com.pranav_khode.user_management_service.DTO.request.UserRegistrationRequest;
import com.pranav_khode.user_management_service.database.Client;
import com.pranav_khode.user_management_service.database.ClientRepository;
import com.pranav_khode.user_management_service.database.Freelancer;
import com.pranav_khode.user_management_service.database.FreelancerRepository;
import com.pranav_khode.user_management_service.database.User;
import com.pranav_khode.user_management_service.database.UserRepository;
import com.pranav_khode.user_management_service.database.VerificationToken;
import com.pranav_khode.user_management_service.database.VerificationTokenRepository;
import com.pranav_khode.user_management_service.email.EmailService;
import com.pranav_khode.user_management_service.enums.Role;
import com.pranav_khode.user_management_service.response.LoginResponse;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;


@Service
public class UserAuthenticationService {
	
	private final UserRepository userRepository;
	private final VerificationTokenRepository tokenRepository;
	private final FreelancerRepository freelancerRepository;
	private final ClientRepository clientRepository;
	private final PasswordEncoder passwordEncoder;
	private final EmailService emailService;
	private final JwtEncoder jwtEncoder; 

	
	public UserAuthenticationService(UserRepository userRepository, VerificationTokenRepository tokenRepository,
			FreelancerRepository freelancerRepository, ClientRepository clientRepository,
			PasswordEncoder passwordEncoder, EmailService emailService, JwtEncoder jwtEncoder) {
		super();
		this.userRepository = userRepository;
		this.tokenRepository = tokenRepository;
		this.freelancerRepository = freelancerRepository;
		this.clientRepository = clientRepository;
		this.passwordEncoder = passwordEncoder;
		this.emailService = emailService;
		this.jwtEncoder = jwtEncoder;
	}
	
	private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
	
	
	@Transactional
	public synchronized void registerUser(UserRegistrationRequest request) {

	    if (userRepository.existsByUsername(request.getUsername())) {
	        User user = userRepository.findByUsername(request.getUsername());
	        if (user.isVarified()) {
	            throw new RuntimeException("User with this username already exists!");
	        } else {
	            tokenRepository.deleteByUser(user);
	            userRepository.delete(user);
	        }
	    }

	    Role role = Role.valueOf(request.getRole().toUpperCase());
	    if (userRepository.existsByEmailAndRole(request.getEmail(), role)) {
	        User user = userRepository.findByEmailAndRole(request.getEmail(), role);
	        if (user.isVarified()) {
	            throw new RuntimeException("User with this Email and Role already exists.");
	        } else {
	            tokenRepository.deleteByUser(user);
	            userRepository.delete(user);
	        }
	    }

	    User user = createUser(request);
	    User savedUser = userRepository.save(user); 

	    if (role == Role.FREELANCER) {
	        Freelancer freelancer = createFreelancer(request, savedUser);
	    } else if (role == Role.CLIENT) {
	        Client client = createClient(request, savedUser);
	    } else {
	        throw new RuntimeException("Invalid user type (role)!");
	    }

	    String otp = generateOtp();
	    LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(5);

	    tokenRepository.deleteByUser(savedUser); // cleanup if exists

	    VerificationToken verificationToken = new VerificationToken();
	    verificationToken.setUser(savedUser);
	    verificationToken.setToken(otp);
	    verificationToken.setExpiryDate(expiryDate);
	    tokenRepository.save(verificationToken);

	    emailService.sendOtpEmail(savedUser.getEmail(), otp);
	}

	
	
	

	@Transactional
	public void verifyOtp(OtpVerificationRequest request) {
		Role role = Role.valueOf(request.getRole().toUpperCase());
		User user = userRepository.findByEmailAndRole(request.getEmail(), role);
		
		if(user == null) {
			throw new RuntimeException("User not found");
		}
		
		VerificationToken verificationToken = tokenRepository.findByUser(user);
		if(verificationToken == null) {
			throw new RuntimeException("No verification code found for this user.");
		}
		
		if(verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
			tokenRepository.delete(verificationToken);
			throw new RuntimeException("Verification code has expired. Please request a new one.");
		}
		
		if(!verificationToken.getToken().equals(request.getOtp())) {
			throw new RuntimeException("Invalid verification code.");
		}
		user.setVarified(true);
		userRepository.save(user);
		tokenRepository.delete(verificationToken);
	}
	
	
	@Transactional
	public void resendOtp(OtpResendRequset request) {
		Role role = Role.valueOf(request.getRole().toUpperCase());
		User user = userRepository.findByEmailAndRole(request.getEmail(), role);
		if(user == null) {
			throw new RuntimeException("User not found.");
		}
		
		if(user.isVarified()) {
			throw new RuntimeException("User is already verified.");
		}
		
		String otp = generateOtp();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(5);
		
		VerificationToken existingToken = tokenRepository.findByUser(user);
		VerificationToken verificationToken;
        if (existingToken != null) {
            verificationToken = existingToken;
            verificationToken.setToken(otp);
            verificationToken.setExpiryDate(expiryDate);
        } else {
            verificationToken = new VerificationToken();
            verificationToken.setToken(otp);
            verificationToken.setUser(user);
            verificationToken.setExpiryDate(expiryDate);
        }
        
        tokenRepository.save(verificationToken);
        emailService.sendOtpEmail(user.getEmail(), otp);
	}

	public LoginResponse login(@Valid UserLoginRequest request) {
		Role role = Role.valueOf(request.getRole().toUpperCase());
		User user = userRepository.findByEmailAndRole(request.getEmail(), role);
		
		if(user != null && user.isVarified() && 
				passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
				String token = createToken(user);
				LoginResponse response = new LoginResponse(true, token, user.getUsername(), user.getUserId().toString());
			return response;
		}else {
			throw new RuntimeException("Authentication failed! \n User does not exists or verified! \n Please register again!");
		}
	}
	
	public String createToken(User user) {
		var claims = JwtClaimsSet.builder()
				.issuer("skillchain-user-management-service")
				.subject(user.getEmail())
				.issuedAt(Instant.now())
				.expiresAt(Instant.now().plusSeconds(3600))
				.claim("role", user.getRole().name())
				.claim("username", user.getUsername())
				.claim("userId", user.getUserId())
				.build();
		return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
	
	public User createUser(UserRegistrationRequest request) {
		User user = new User();
		
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
		user.setRole(Role.valueOf(request.getRole().toUpperCase()));
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setPhone(request.getPhone());
		user.setVarified(false);
		
		return user;
	}
	
	private Freelancer createFreelancer(UserRegistrationRequest request, User savedUser) {
		Freelancer freelancer = new Freelancer();
		freelancer.setUser(savedUser);
		freelancer.setExperience(request.getExperience());
		freelancer.setHourlyRate(BigDecimal.valueOf(Integer.valueOf(request.getHourlyRate())));
		freelancer.setSkills(request.getSkills());
		
		return freelancerRepository.save(freelancer);
	}
	
	private Client createClient(UserRegistrationRequest request, User savedUser) {
		Client client = new Client();
		client.setUser(savedUser);
		client.setCompanyName(request.getCompanyName());
		client.setCompanySize(request.getCompanySize());
		client.setIndustry(request.getIndustry());
		return clientRepository.save(client);
	}
}

