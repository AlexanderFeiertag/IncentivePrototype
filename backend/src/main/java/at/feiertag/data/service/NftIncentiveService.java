package at.feiertag.data.service;

import at.feiertag.data.entity.NftIncentiveEntity;

import java.util.List;

public interface NftIncentiveService {

    List<NftIncentiveEntity> getAllNftIncentives();

    NftIncentiveEntity addNftIncentives(NftIncentiveEntity incentive);

    NftIncentiveEntity updateNftIncentives(NftIncentiveEntity incentive);

    void deleteNftIncentive(String name);
}
