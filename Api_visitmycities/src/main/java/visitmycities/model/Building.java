package visitmycities.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String type;
    private int annee;
    private double taille;
    private String gps;
    @Column( length = 210)
    private String description;
    private String image;
    @ManyToOne
    @JoinColumn(name="architect_id")
    private Architect architect;
    @ElementCollection
    @CollectionTable(name="building_details", joinColumns = @JoinColumn(name="building_id"))
    @Column(name="description")
    private List<String> details = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name="ville_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    private City ville;
    boolean valide = false;

    public Building(String nom, String type, Architect architect, int annee, double taille, String gps, String description, String image,City ville) {
        this.nom = nom;
        this.type= type;
        this.architect = architect;
        this.annee = annee;
        this.taille = taille;
        this.gps = gps;
        this.description = description;
        this.image = image;
        this.ville = ville;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
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

    public double getTaille() {
        return taille;
    }

    public void setTaille(double taille) {
        this.taille = taille;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public String getGps() {
        return gps;
    }

    public void setGps(String gps) {
        this.gps = gps;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public boolean isValide() {
        return valide;
    }

    public void setValide(boolean valide) {
        this.valide = valide;
    }
}