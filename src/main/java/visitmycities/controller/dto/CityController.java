package visitmycities.controller.dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import visitmycities.dao.BuildingRepository;
import visitmycities.dao.CityRepository;
import visitmycities.model.Building;
import visitmycities.model.City;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/visitmycities")
public class CityController {

    private CityRepository cityRepository;
    private BuildingRepository buildingRepository;

    public CityController(CityRepository cityRepository, BuildingRepository buildingRepository) {
        this.cityRepository = cityRepository;
        this.buildingRepository = buildingRepository;
    }

    /**
     *
     * @return
     */
    @GetMapping("/ville")
    public List<City> getAllCities() {return this.cityRepository.findAll();}

    /**
     *
     * @param id
     * @return
     */
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
     * @return
     */
    @PatchMapping("/ville/{id}")
    public ResponseEntity<Void> updateCityById(@PathVariable Long id, @RequestBody City city) {
        Optional<City> optionalCity = cityRepository.findById(id);

        if (!optionalCity.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        City c = optionalCity.get();

        c.setNom(city.getNom());
        c.setCp(city.getCp());

        cityRepository.save(c);

        return ResponseEntity.ok().build();
    }

    /**
     *
     * @param cityId
     * @param building
     * @return
     */
    @PostMapping("/ville/{cityId}/batiment")
    public ResponseEntity<Building> addBuildingToCity(@PathVariable Long cityId, @RequestBody Building building) {
        Optional<City> optionalCity = cityRepository.findById(cityId);

        if (!optionalCity.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        City city = optionalCity.get();

        if (building.getId() != null) {

            Optional<Building> optionalBuilding = buildingRepository.findById(building.getId());

            if (optionalBuilding.isPresent()) {
                Building existingBuilding = optionalBuilding.get();
                existingBuilding.setNom(building.getNom());
                existingBuilding.setType(building.getType());
                existingBuilding.setArchitect(building.getArchitect());
                existingBuilding.setVille(city); // Lien avec la ville
                buildingRepository.save(existingBuilding);
                return ResponseEntity.ok(existingBuilding);
            }
        }

        building.setVille(city);
        Building savedBuilding = buildingRepository.save(building);
        return ResponseEntity.ok(savedBuilding);
    }

}
