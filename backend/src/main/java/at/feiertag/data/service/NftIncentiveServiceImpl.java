package at.feiertag.data.service;

import at.feiertag.data.entity.NftIncentiveEntity;
import at.feiertag.data.repository.NftIncentiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NftIncentiveServiceImpl implements NftIncentiveService {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private NftIncentiveRepository repository;

    @Override
    public List<NftIncentiveEntity> getAllNftIncentives() {
        List<NftIncentiveEntity> result = new ArrayList<>();
        repository.findAll().forEach(result::add);

        return result;
    }

    @Override
    public NftIncentiveEntity addNftIncentives(NftIncentiveEntity incentive) {
        return repository.save(incentive);
    }

    @Override
    public NftIncentiveEntity updateNftIncentives(NftIncentiveEntity incentive) {
        return repository.save(incentive);
    }

    @Override
    public void deleteNftIncentive(String name) {
        repository.deleteById(name);
    }
}
