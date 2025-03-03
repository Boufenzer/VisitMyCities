package visitmycities.controller.dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import visitmycities.dao.BuildingRepository;
import visitmycities.dao.CityRepository;
import visitmycities.model.City;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/visitmycities")
public class CityController {

    private CityRepository cityRepository;
    private BuildingRepository buildingRepository;

    public CityController(CityRepository cityRepository, BuildingRepository buildingRepository) {
        this.cityRepository = cityRepository;
        this.buildingRepository = buildingRepository;
    }

    @GetMapping("/ville")
    public List<City> getAllCities() {return this.cityRepository.findAll();}

    @GetMapping("/ville/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id) {
        Optional<City> city = this.cityRepository.findById(id);
        if (city.isPresent()) {
            return ResponseEntity.ok(city.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/ville")
    public City addCity(@RequestBody City city) {return cityRepository.save(city);}

    @DeleteMapping("/ville/{id}")
    public void deleteCityById(@PathVariable Long id) {cityRepository.deleteById(id);}


    /**
     *
     * @param id
     * @param city
     *
     *
     *  marche pas actuellement
     *
     *
     *
     */
    @PatchMapping("/ville/{id}")
    public void updateCityById(@PathVariable Long id, @RequestBody City city) {
        City c = cityRepository.getReferenceById(id);
        if (c == null){
            return;
        }
        c.setNom(city.getNom());
        c.setCp(city.getCp());
    }


}
