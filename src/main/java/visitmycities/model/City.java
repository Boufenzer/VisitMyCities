package visitmycities.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "city_id", nullable = false)
    private Long id;
    private String nom;
    private String cp;
    @OneToMany(mappedBy = "ville", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Building> listBats = new ArrayList<>();
    private String coordonnees = null;
    // département
    // pays


    public City(String nom, String cp) {
        this.nom = nom;
        this.cp = cp;
    }

    public City() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCp() {
        return cp;
    }

    public void setCp(String cp) {
        this.cp = cp;
    }

    public List<Building> getListBats() {
        return listBats;
    }


    public void setListBats(List<Building> listBats) {
        this.listBats = listBats;
    }

    public void addToBuildingList(Building building) {
        this.listBats.add(building);
    }

    public void removeFromBuildingList(Building building) {
        this.listBats.remove(building);
    }

    public String getCoordonnees() {
        return coordonnees;
    }

    public void setCoordonnees(String coordonnees) {
        this.coordonnees = coordonnees;
    }
}
