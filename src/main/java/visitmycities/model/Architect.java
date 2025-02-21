package visitmycities.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Architect {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance = null;
    private LocalDate dateMort = null;

    public Architect(String nom, String prenom, LocalDate dateNaissance, LocalDate dateMort) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.dateMort = dateMort;
    }

    public Architect(String nom, String prenom, LocalDate dateNaissance) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
    }

    public Architect(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    public Architect() {

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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public LocalDate getDateMort() {
        return dateMort;
    }

    public void setDateMort(LocalDate dateMort) {
        this.dateMort = dateMort;
    }
}
