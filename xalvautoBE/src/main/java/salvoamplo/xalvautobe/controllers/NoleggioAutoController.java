package salvoamplo.xalvautobe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import salvoamplo.xalvautobe.entities.NoleggioAuto;
import salvoamplo.xalvautobe.repositories.NoleggioAutoRepository;
import salvoamplo.xalvautobe.services.CloudinaryService;

import java.util.List;

@RestController
@RequestMapping("/noleggio")
@CrossOrigin(origins = "http://localhost:5173")
public class NoleggioAutoController {

    @Autowired
    private NoleggioAutoRepository noleggioAutoRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("")
    public List<NoleggioAuto> getAllNoleggioAuto(
            @RequestParam(required = false) Boolean disponibile,
            @RequestParam(required = false) String marca
    ) {
        if (disponibile != null && marca != null) {
            return noleggioAutoRepository.findAll().stream()
                    .filter(a -> a.isDisponibile() == disponibile)
                    .filter(a -> a.getMarca().toLowerCase().contains(marca.toLowerCase()))
                    .toList();
        }

        if (disponibile != null) {
            return noleggioAutoRepository.findByDisponibile(disponibile);
        }

        if (marca != null) {
            return noleggioAutoRepository.findByMarcaContainingIgnoreCase(marca);
        }

        return noleggioAutoRepository.findAll();
    }

    @GetMapping("/{id}")
    public NoleggioAuto getNoleggioAutoById(@PathVariable Long id) {
        return noleggioAutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto a noleggio non trovata"));
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public NoleggioAuto createNoleggioAuto(
            @RequestParam("marca") String marca,
            @RequestParam("modello") String modello,
            @RequestParam("prezzoGiornaliero") double prezzoGiornaliero,
            @RequestParam("prezzoSettimanale") double prezzoSettimanale,
            @RequestParam("disponibile") boolean disponibile,
            @RequestParam("immagine") MultipartFile immagine
    ) throws Exception {

        String imageUrl = cloudinaryService.uploadImage(immagine);

        NoleggioAuto auto = new NoleggioAuto();
        auto.setMarca(marca);
        auto.setModello(modello);
        auto.setPrezzoGiornaliero(prezzoGiornaliero);
        auto.setPrezzoSettimanale(prezzoSettimanale);
        auto.setDisponibile(disponibile);
        auto.setImmagine(imageUrl);

        return noleggioAutoRepository.save(auto);
    }

    @DeleteMapping("/{id}")
    public void deleteNoleggioAuto(@PathVariable Long id) {
        NoleggioAuto found = noleggioAutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto a noleggio non trovata"));

        noleggioAutoRepository.delete(found);
    }
}