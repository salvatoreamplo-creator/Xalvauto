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
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://xalvauto.netlify.app"
})
public class NoleggioAutoController {

    @Autowired
    private NoleggioAutoRepository noleggioAutoRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("")
    public List<NoleggioAuto> getAllNoleggio() {
        return noleggioAutoRepository.findAll();
    }

    @GetMapping("/{id}")
    public NoleggioAuto getNoleggioById(@PathVariable Long id) {
        return noleggioAutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto a noleggio non trovata"));
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public NoleggioAuto createNoleggio(
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

    @PatchMapping("/{id}/toggle-disponibile")
    public NoleggioAuto toggleDisponibile(@PathVariable Long id) {
        NoleggioAuto auto = noleggioAutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto non trovata"));

        auto.setDisponibile(!auto.isDisponibile());

        return noleggioAutoRepository.save(auto);
    }

    @DeleteMapping("/{id}")
    public void deleteNoleggio(@PathVariable Long id) {
        NoleggioAuto auto = noleggioAutoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto a noleggio non trovata"));

        noleggioAutoRepository.delete(auto);
    }
}