package com.textileshop.backend.controller;

import com.textileshop.backend.dto.AddressRequest;
import com.textileshop.backend.entity.Address;
import com.textileshop.backend.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/addresses")
@PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<Address>> getMyAddresses(Principal principal) {
        return ResponseEntity.ok(addressService.getUserAddresses(principal.getName()));
    }

    @GetMapping("/default")
    public ResponseEntity<?> getDefaultAddress(Principal principal) {
        Address address = addressService.getDefaultAddress(principal.getName());
        if (address == null) {
            return ResponseEntity.ok(Map.of("message", "No default address set"));
        }
        return ResponseEntity.ok(address);
    }

    @PostMapping
    public ResponseEntity<Address> createAddress(
            Principal principal,
            @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.ok(addressService.createAddress(principal.getName(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.ok(addressService.updateAddress(principal.getName(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(Principal principal, @PathVariable Long id) {
        addressService.deleteAddress(principal.getName(), id);
        return ResponseEntity.ok(Map.of("message", "Address deleted successfully"));
    }

    @PatchMapping("/{id}/set-default")
    public ResponseEntity<Address> setDefault(Principal principal, @PathVariable Long id) {
        return ResponseEntity.ok(addressService.setDefaultAddress(principal.getName(), id));
    }
}