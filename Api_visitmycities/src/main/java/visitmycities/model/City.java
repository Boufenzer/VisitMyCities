package visitmycities.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String image;
    @OneToMany(mappedBy = "ville", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Building> listBats = new ArrayList<>();


    public City(String nom, String cp, String image) {
        this.nom = nom;
        this.cp = cp;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
