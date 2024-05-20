package at.feiertag.data.service;

import at.feiertag.data.entity.CurrencyIncentiveEntity;
import at.feiertag.data.repository.CurrencyIncentiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CurrencyIncentiveServiceImpl implements CurrencyIncentiveService {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private CurrencyIncentiveRepository repository;

    @Override
    public List<CurrencyIncentiveEntity> getAllCurrencyIncentives() {
        List<CurrencyIncentiveEntity> result = new ArrayList<>();
        repository.findAll().forEach(result::add);

        result.sort(new Comparator<CurrencyIncentiveEntity>() {
            @Override
            public int compare(CurrencyIncentiveEntity o1, CurrencyIncentiveEntity o2) {
                return o2.getPrice() - o1.getPrice();
            }
        });

        return result;
    }

    @Override
    public List<CurrencyIncentiveEntity> getAvailableCurrencyIncentives() {
        List<CurrencyIncentiveEntity> result = new ArrayList<>();
        repository.findAvailable().forEach(result::add);

        result.sort(new Comparator<CurrencyIncentiveEntity>() {
            @Override
            public int compare(CurrencyIncentiveEntity o1, CurrencyIncentiveEntity o2) {
                return o2.getPrice() - o1.getPrice();
            }
        });

        return result;
    }

    @Override
    public CurrencyIncentiveEntity addCurrencyIncentives(CurrencyIncentiveEntity incentive) {
        return repository.save(incentive);
    }

    @Override
    public CurrencyIncentiveEntity updateCurrencyIncentives(CurrencyIncentiveEntity incentive) {
        return repository.save(incentive);
    }

    @Override
    public void deleteCurrencyIncentive(String name) {
        repository.deleteById(name);
    }
}
