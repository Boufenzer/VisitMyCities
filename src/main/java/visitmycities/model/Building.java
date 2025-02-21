package visitmycities.model;

import jakarta.persistence.*;
import visitmycities.model.enums.EBuildingTypes;

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

    public Building(String nom, EBuildingTypes type, Architect architect) {
        this.nom = nom;
        this.type= type;
        this.architect = architect;
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

    public Enum getType() {
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
}
