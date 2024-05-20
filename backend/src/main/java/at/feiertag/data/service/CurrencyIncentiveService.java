package at.feiertag.data.service;

import at.feiertag.data.entity.CurrencyIncentiveEntity;

import java.util.List;

public interface CurrencyIncentiveService {

    List<CurrencyIncentiveEntity> getAllCurrencyIncentives();

    List<CurrencyIncentiveEntity> getAvailableCurrencyIncentives();

    CurrencyIncentiveEntity addCurrencyIncentives(CurrencyIncentiveEntity incentive);

    CurrencyIncentiveEntity updateCurrencyIncentives(CurrencyIncentiveEntity incentive);

    void deleteCurrencyIncentive(String name);
}
