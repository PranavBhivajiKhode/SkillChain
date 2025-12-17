package com.pranav_khode.job_posting_service.database;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import com.pranav_khode.job_posting_service.enums.JobStatus;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class JobSpecifications {

    public static Specification<Jobs> hasStatus(JobStatus status) {
        return (root, query, cb) ->
            (status == null) ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Jobs> hasBudgetRange(double[] budgetRange) {
        return (root, query, cb) -> {
            if (budgetRange == null || budgetRange.length != 2) {
                return null;
            }

            double min = budgetRange[0];
            double max = budgetRange[1];

            // Case 1: Only upper bound (Under $1000 → [0, 1000])
            if (min == 0 && max > 0 && max != Double.MAX_VALUE) {
                return cb.lessThanOrEqualTo(root.get("budgetAmount"), BigDecimal.valueOf(max));
            }

            // Case 2: Only lower bound (Above $5000 → [5000, Double.MAX_VALUE])
            if (max == Double.MAX_VALUE && min > 0) {
                return cb.greaterThanOrEqualTo(root.get("budgetAmount"), BigDecimal.valueOf(min));
            }

            // Case 3: Both min & max defined (3000–5000)
            if (min > 0 && max > 0 && max != Double.MAX_VALUE) {
                return cb.between(root.get("budgetAmount"), BigDecimal.valueOf(min), BigDecimal.valueOf(max));
            }

            return null; // no filtering
        };
    }
    
    public static Specification<Jobs> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }

            String likePattern = "%" + keyword.toLowerCase() + "%";

            // Join with requiredSkills collection
            Join<Jobs, String> skillsJoin = root.join("requiredSkills", JoinType.LEFT);

            // OR predicate: title OR description OR requiredSkills contains keyword
            return cb.or(
                    cb.like(cb.lower(root.get("title")), likePattern),
                    cb.like(cb.lower(root.get("description")), likePattern),
                    cb.like(cb.lower(skillsJoin), likePattern)
            );
        };
    }
    
    public static Specification<Jobs> hasAnySkill(List<String> skills) {
        return (root, query, cb) -> {
            if (skills == null || skills.isEmpty()) {
                return null;
            }

            Join<Jobs, String> skillsJoin = root.join("requiredSkills", JoinType.LEFT);

            List<Predicate> predicates = new ArrayList<>();
            for (String skill : skills) {
                predicates.add(cb.like(cb.lower(skillsJoin), "%" + skill.toLowerCase() + "%"));
            }

            return cb.or(predicates.toArray(new Predicate[0]));
        };
    }

    
}
