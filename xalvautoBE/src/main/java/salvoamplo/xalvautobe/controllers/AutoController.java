package salvoamplo.xalvautobe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import salvoamplo.xalvautobe.entities.Auto;
import salvoamplo.xalvautobe.entities.CondizioneAuto;
import salvoamplo.xalvautobe.repositories.AutoRepository;
import salvoamplo.xalvautobe.services.CloudinaryService;

@RestController
@RequestMapping("/auto")
@CrossOrigin(origins = "http://localhost:5173")
public class AutoController {

    @Autowired
    private AutoRepository autoRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public Auto createAuto(
            @RequestParam String marca,
            @RequestParam String modello,
            @RequestParam int anno,
            @RequestParam double prezzo,
            @RequestParam int chilometri,
            @RequestParam String descrizione,
            @RequestParam CondizioneAuto condizione,
            @RequestParam MultipartFile immagine
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
}