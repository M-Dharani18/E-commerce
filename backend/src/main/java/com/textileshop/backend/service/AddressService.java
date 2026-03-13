package com.textileshop.backend.service;

import com.textileshop.backend.dto.AddressRequest;
import com.textileshop.backend.entity.Address;
import com.textileshop.backend.entity.User;
import com.textileshop.backend.exception.ResourceNotFoundException;
import com.textileshop.backend.repository.AddressRepository;
import com.textileshop.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<Address> getUserAddresses(String email) {
        User user = getUser(email);
        return addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(user.getId());
    }

    @Transactional
    public Address createAddress(String email, AddressRequest request) {
        User user = getUser(email);

        // If this is set as default, unset other defaults
        if (request.getIsDefault()) {
            addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                    .ifPresent(addr -> {
                        addr.setIsDefault(false);
                        addressRepository.save(addr);
                    });
        }

        // If this is the first address, make it default
        if (addressRepository.findByUserId(user.getId()).isEmpty()) {
            request.setIsDefault(true);
        }

        Address address = Address.builder()
                .user(user)
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .isDefault(request.getIsDefault())
                .build();

        return addressRepository.save(address);
    }

    @Transactional
    public Address updateAddress(String email, Long addressId, AddressRequest request) {
        User user = getUser(email);
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized");
        }

        // If setting as default, unset other defaults
        if (request.getIsDefault() && !address.getIsDefault()) {
            addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                    .ifPresent(addr -> {
                        addr.setIsDefault(false);
                        addressRepository.save(addr);
                    });
        }

        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setEmail(request.getEmail());
        address.setAddressLine1(request.getAddressLine1());
        address.setAddressLine2(request.getAddressLine2());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setIsDefault(request.getIsDefault());

        return addressRepository.save(address);
    }

    @Transactional
    public void deleteAddress(String email, Long addressId) {
        User user = getUser(email);
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized");
        }

        boolean wasDefault = address.getIsDefault();
        addressRepository.delete(address);

        // If deleted address was default, make another one default
        if (wasDefault) {
            List<Address> remaining = addressRepository.findByUserId(user.getId());
            if (!remaining.isEmpty()) {
                Address newDefault = remaining.get(0);
                newDefault.setIsDefault(true);
                addressRepository.save(newDefault);
            }
        }
    }

    @Transactional
    public Address setDefaultAddress(String email, Long addressId) {
        User user = getUser(email);
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized");
        }

        // Unset current default
        addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                .ifPresent(addr -> {
                    addr.setIsDefault(false);
                    addressRepository.save(addr);
                });

        // Set new default
        address.setIsDefault(true);
        return addressRepository.save(address);
    }

    public Address getDefaultAddress(String email) {
        User user = getUser(email);
        return addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                .orElse(null);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}