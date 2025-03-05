package visitmycities.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import visitmycities.model.enums.EBuildingTypes;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "building_id", nullable = false)
    private Long id;
    private String nom;
    private EBuildingTypes type;
    @ManyToOne
    @JoinColumn(name="architect_id", nullable = false)
    private Architect architect = new Architect();
    @ManyToOne
    @JoinColumn(name="ville_id")
    @JsonBackReference
    private City ville;
    private String coordonnees = null;
    @ElementCollection
    @CollectionTable(name="building_details", joinColumns = @JoinColumn(name="building_id"))
    @Column(name="description")
    private List<String> details = new ArrayList<>();
    @ElementCollection
    @CollectionTable(name="building_images",joinColumns = @JoinColumn(name="building_id"))
    @Column(name="description")
    private List<String> images = new ArrayList<>();

    public Building(String nom, EBuildingTypes type, Architect architect) {
        this.nom = nom;
        this.type= type;
        this.architect = architect;
    }

    public Building(String nom, EBuildingTypes type, Architect architect, City ville, String coordonnees) {
        this.nom = nom;
        this.type = type;
        this.architect = architect;
        this.ville = ville;
        this.coordonnees = coordonnees;
    }

    public Building() {

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

    public EBuildingTypes getType() {
        return type;
    }

    public void setType(EBuildingTypes type) {
        this.type = type;
    }

    public Architect getArchitect() {
        return architect;
    }

    public void setArchitect(Architect architect) {
        this.architect = architect;
    }

    public City getVille() {
        return ville;
    }

    public void setVille(City ville) {
        this.ville = ville;
    }

    public String getCoordonnees() {
        return coordonnees;
    }

    public void setCoordonnees(String coordonnees) {
        this.coordonnees = coordonnees;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }

    public void addDetail(String detail) {
        this.details.add(detail);
    }

    public void removeDetail(String detail) {
        this.details.remove(detail);
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public void addImage(String image) {
        this.images.add(image);
    }

    public void removeImage(String image) {
        this.images.remove(image);
    }
}
