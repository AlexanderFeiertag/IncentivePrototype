package at.feiertag.controller;

import at.feiertag.data.entity.CurrencyIncentiveEntity;
import at.feiertag.data.service.CurrencyIncentiveService;
import at.feiertag.dto.CurrencyIncentiveDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/incentive")
public class IncentiveController {

    @Autowired
    private CurrencyIncentiveService currencyIncentiveService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> createIncentive(@RequestBody CurrencyIncentiveDTO currencyIncentiveDTO) {
        try {
            CurrencyIncentiveEntity incentiveEntity = new ModelMapper().map(currencyIncentiveDTO, CurrencyIncentiveEntity.class);
            currencyIncentiveService.addCurrencyIncentives(incentiveEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> updateIncentive(@RequestBody CurrencyIncentiveDTO currencyIncentiveDTO) {
        try {
            CurrencyIncentiveEntity incentiveEntity = new ModelMapper().map(currencyIncentiveDTO, CurrencyIncentiveEntity.class);
            currencyIncentiveService.updateCurrencyIncentives(incentiveEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/{name}", produces = "application/json")
    public ResponseEntity<HttpStatus> deleteIncentive(@PathVariable String name) {
        try {
            currencyIncentiveService.deleteCurrencyIncentive(name);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<List<CurrencyIncentiveDTO>> getIncentives() {
        try {
            List<CurrencyIncentiveDTO> result = new ArrayList<>();
            currencyIncentiveService.getAllCurrencyIncentives().forEach(incentiveEntity -> result.add(new ModelMapper().map(incentiveEntity, CurrencyIncentiveDTO.class)));

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/available", produces = "application/json")
    public ResponseEntity<List<CurrencyIncentiveDTO>> getAvailableIncentives() {
        try {
            List<CurrencyIncentiveDTO> result = new ArrayList<>();
            currencyIncentiveService.getAvailableCurrencyIncentives().forEach(incentiveEntity -> result.add(new ModelMapper().map(incentiveEntity, CurrencyIncentiveDTO.class)));

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
