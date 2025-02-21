package visitmycities.model;

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
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Building> listBats = new ArrayList<>();


    public City(String nom, String cp, List<Building> listBats) {
        this.nom = nom;
        this.cp = cp;
        this.listBats = listBats;
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

    public Building getListBats() {
        return (Building) listBats;
    }

    public void setListBats(List<Building> listBats) {
        this.listBats = listBats;
    }

    public void addToBuildingList(Building building) {
        this.listBats.add(building);
    }

}
