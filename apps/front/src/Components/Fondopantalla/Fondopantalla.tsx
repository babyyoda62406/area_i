import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { OptionParticle } from "../../Helpers/OptionParticle";
import './Fondopantalla.css'


const FondoPantalla = () => {
    
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        

    }, []);

        
    return (<Particles
        id="FondoParticulas" init={particlesInit}
        loaded={particlesLoaded}
        options={ OptionParticle }/> )
}

export default FondoPantalla