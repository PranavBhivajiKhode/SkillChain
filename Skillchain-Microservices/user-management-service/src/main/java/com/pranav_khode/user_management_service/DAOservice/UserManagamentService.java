package com.pranav_khode.user_management_service.DAOservice;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pranav_khode.user_management_service.database.ClientRepository;
import com.pranav_khode.user_management_service.database.FreelancerRepository;
import com.pranav_khode.user_management_service.database.User;
import com.pranav_khode.user_management_service.database.UserRepository;
import com.pranav_khode.user_management_service.records.FreelancerBidDetails;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserManagamentService {
	
	private final UserRepository userRepository;
	private final FreelancerRepository freelancerRepository;
	private final ClientRepository clientRepository;

	public UserManagamentService(UserRepository userRepository, FreelancerRepository freelancerRepository,
								ClientRepository clientRepository) {
		super();
		this.userRepository = userRepository;
		this.freelancerRepository = freelancerRepository;
		this.clientRepository = clientRepository;
	}
	
	
	public Map<UUID, String> retrieveUsernameUsingUserId(List<UUID> userIds){
		List<Object[]> result =  userRepository.findUsernamesByUserIds(userIds);
		
		Map<UUID, String> userMap = result.stream()
							.collect(Collectors.toMap(
									row -> (UUID) row[0],
									row -> (String) row[1])
									);
		return userMap;
	}


	public HashMap<UUID, FreelancerBidDetails> retrieveFreelancersDetailsForBid(List<UUID> freelancerIds) {

		HashMap<UUID, String> result =  (HashMap<UUID, String>) retrieveUsernameUsingUserId(freelancerIds);
		
		List<Object[]> details = freelancerRepository.retrieveFreelancerDetailsForBid(freelancerIds);
		
		Map<UUID, List<String>> skillsMap = freelancerRepository.findFreelancerSkills(freelancerIds)
		        .stream()
		        .collect(Collectors.groupingBy(
		            obj -> (UUID) obj[0],
		            Collectors.mapping(obj -> (String) obj[1], Collectors.toList())
		        ));
		
		HashMap<UUID, FreelancerBidDetails> response = new HashMap<UUID, FreelancerBidDetails>();
		
		for(Object[] obj : details) {
			UUID freelancerId = (UUID) obj[0];
			Double rating = (Double) obj[1];
			Integer totalProjects = (Integer) obj[2];
			List<String> skills = skillsMap.getOrDefault(freelancerId, Collections.emptyList());
			
			FreelancerBidDetails data = new FreelancerBidDetails(result.get(freelancerId), rating, totalProjects, skills);
			response.put(freelancerId, data);
		}
		
		return response;
	}


	public String retrieveFreelancerName(UUID freelancerId) {
		User user = userRepository.findById(freelancerId).orElse(null);
		
		if(user == null) {
			throw new EntityNotFoundException("Freelancer with id: " + freelancerId + "Not found");
		}else {
			return user.getUsername();
		}
	}
}
