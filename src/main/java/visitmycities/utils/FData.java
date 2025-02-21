package visitmycities.utils;

import visitmycities.model.Architect;
import visitmycities.model.Building;
import visitmycities.model.City;
import visitmycities.model.Data;
import visitmycities.model.enums.EBuildingTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FData {

    private static Optional<Data> dataSingleton = Optional.empty();

    public static Data getDatas() {
        if (dataSingleton.isPresent()) {
            return dataSingleton.get();
        }

        List<Architect> architects = new ArrayList<>();
        architects.add(new Architect("Lynthumer","Michel"));


        List<Building> buildings = new ArrayList<>();
        buildings.add(new Building("Hôtel de ville", EBuildingTypes.MUNICIPAL, architects.get(1)));

        City b = new City("Mulhouse","68100",buildings);
        List<City> h = new ArrayList<>();
        h.add(b);



        Data d = new Data("Test",h);
        dataSingleton = Optional.of(d);
        return d;

    }
}
