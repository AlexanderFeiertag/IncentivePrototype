package at.feiertag.controller;

import at.feiertag.data.entity.NftIncentiveEntity;
import at.feiertag.data.service.NftIncentiveService;
import at.feiertag.dto.NftIncentiveDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/nft-incentive")
public class NftIncentiveController {

    @Autowired
    private NftIncentiveService nftIncentiveService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> createIncentive(@RequestBody NftIncentiveDTO incentiveDTO) {
        try {
            NftIncentiveEntity incentiveEntity = new ModelMapper().map(incentiveDTO, NftIncentiveEntity.class);
            nftIncentiveService.addNftIncentives(incentiveEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> updateIncentive(@RequestBody NftIncentiveDTO incentiveDTO) {
        try {
            NftIncentiveEntity incentiveEntity = new ModelMapper().map(incentiveDTO, NftIncentiveEntity.class);
            nftIncentiveService.updateNftIncentives(incentiveEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/{address}", produces = "application/json")
    public ResponseEntity<HttpStatus> deleteIncentive(@PathVariable String address) {
        try {
            nftIncentiveService.deleteNftIncentive(address);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<List<NftIncentiveDTO>> getAllIncentives() {
        try {
            List<NftIncentiveDTO> result = new ArrayList<>();
            nftIncentiveService.getAllNftIncentives().forEach(incentiveEntity -> result.add(new ModelMapper().map(incentiveEntity, NftIncentiveDTO.class)));

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
