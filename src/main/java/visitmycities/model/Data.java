package visitmycities.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Data {
    private String nom;
    private List<City> villes = new ArrayList<>();

    public Data(String nom, List<City> villes) {
        this.nom = nom;
        this.villes = villes;
    }

    public List<City> getVilles() {return villes;}

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setVilles(List<City> villes) {
        this.villes = villes;
    }

    /*
    * Permet la récupération de l'ensemble des listes de bâtiments
     */
    public Set<Building> tousLesBats(){
        Set<Building> bats = new HashSet<>();
        for (City city : villes) {
            bats.add(city.getListBats());
        }
        return bats;
    }

    /*
    * Permet de connaitre tous les bâtiments dont le nom contient partiellement la chaine en parametre
    * @param nomRecherche
    * */
    public Set<Building> batParNom(String nomRecherche){
        Set<Building> batsOk = new HashSet<>();
        for(Building b : this.tousLesBats()){
            if(b.getNom().contains(nomRecherche)){
                batsOk.add(b);
            }
        }
        return batsOk;
    }


}

