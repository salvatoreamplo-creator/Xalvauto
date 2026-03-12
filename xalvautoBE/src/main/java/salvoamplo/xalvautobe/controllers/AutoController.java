package salvoamplo.xalvautobe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import salvoamplo.xalvautobe.entities.Auto;
import salvoamplo.xalvautobe.entities.CondizioneAuto;
import salvoamplo.xalvautobe.repositories.AutoRepository;
import salvoamplo.xalvautobe.services.CloudinaryService;

import java.util.List;

@RestController
@RequestMapping("/auto")
@CrossOrigin(origins = "http://localhost:5173")
public class AutoController {

    @Autowired
    private AutoRepository autoRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("")
    public List<Auto> getAllAuto(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) CondizioneAuto condizione,
            @RequestParam(required = false) Double prezzoMax
    ) {
        if (marca != null && condizione != null && prezzoMax != null) {
            return autoRepository.findByMarcaContainingIgnoreCaseAndCondizioneAndPrezzoLessThanEqual(
                    marca, condizione, prezzoMax
            );
        }

        if (marca != null && condizione != null) {
            return autoRepository.findByMarcaContainingIgnoreCaseAndCondizione(marca, condizione);
        }

        if (marca != null && prezzoMax != null) {
            return autoRepository.findByMarcaContainingIgnoreCaseAndPrezzoLessThanEqual(marca, prezzoMax);
        }

        if (condizione != null && prezzoMax != null) {
            return autoRepository.findByCondizioneAndPrezzoLessThanEqual(condizione, prezzoMax);
        }

        if (marca != null) {
            return autoRepository.findByMarcaContainingIgnoreCase(marca);
        }

        if (condizione != null) {
            return autoRepository.findByCondizione(condizione);
        }

        if (prezzoMax != null) {
            return autoRepository.findByPrezzoLessThanEqual(prezzoMax);
        }

        return autoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Auto getAutoById(@PathVariable Long id) {
        return autoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto non trovata"));
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public Auto createAuto(
            @RequestParam("marca") String marca,
            @RequestParam("modello") String modello,
            @RequestParam("anno") int anno,
            @RequestParam("prezzo") double prezzo,
            @RequestParam("chilometri") int chilometri,
            @RequestParam("descrizione") String descrizione,
            @RequestParam("condizione") CondizioneAuto condizione,
            @RequestParam("immagine") MultipartFile immagine
    ) throws Exception {

        String imageUrl = cloudinaryService.uploadImage(immagine);

        Auto auto = new Auto();
        auto.setMarca(marca);
        auto.setModello(modello);
        auto.setAnno(anno);
        auto.setPrezzo(prezzo);
        auto.setChilometri(chilometri);
        auto.setDescrizione(descrizione);
        auto.setCondizione(condizione);
        auto.setImmagine(imageUrl);

        return autoRepository.save(auto);
    }

    @PutMapping("/{id}")
    public Auto updateAuto(@PathVariable Long id, @RequestBody Auto updatedAuto) {
        Auto found = autoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto con id " + id + " non trovata"));

        found.setMarca(updatedAuto.getMarca());
        found.setModello(updatedAuto.getModello());
        found.setAnno(updatedAuto.getAnno());
        found.setPrezzo(updatedAuto.getPrezzo());
        found.setChilometri(updatedAuto.getChilometri());
        found.setDescrizione(updatedAuto.getDescrizione());
        found.setCondizione(updatedAuto.getCondizione());
        found.setImmagine(updatedAuto.getImmagine());

        return autoRepository.save(found);
    }

    @DeleteMapping("/{id}")
    public void deleteAuto(@PathVariable Long id) {
        Auto found = autoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto con id " + id + " non trovata"));

        autoRepository.delete(found);
    }
}