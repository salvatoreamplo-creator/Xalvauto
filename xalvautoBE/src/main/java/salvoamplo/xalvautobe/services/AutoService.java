package salvoamplo.xalvautobe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import salvoamplo.xalvautobe.entities.Auto;
import salvoamplo.xalvautobe.repositories.AutoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AutoService {

    @Autowired
    private AutoRepository autoRepository;

    public List<Auto> findAll() {
        return autoRepository.findAll();
    }

    public Auto findById(Long id) {
        Optional<Auto> found = autoRepository.findById(id);
        if (found.isEmpty()) {
            throw new RuntimeException("Auto con id " + id + " non trovata");
        }
        return found.get();
    }

    public Auto save(Auto auto) {
        return autoRepository.save(auto);
    }

    public Auto findByIdAndUpdate(Long id, Auto updatedAuto) {
        Auto found = this.findById(id);

        found.setMarca(updatedAuto.getMarca());
        found.setModello(updatedAuto.getModello());
        found.setAnno(updatedAuto.getAnno());
        found.setPrezzo(updatedAuto.getPrezzo());
        found.setChilometri(updatedAuto.getChilometri());
        found.setImmagine(updatedAuto.getImmagine());
        found.setCondizione(updatedAuto.getCondizione());
        found.setDescrizione(updatedAuto.getDescrizione());

        return autoRepository.save(found);
    }

    public void findByIdAndDelete(Long id) {
        Auto found = this.findById(id);
        autoRepository.delete(found);
    }
}