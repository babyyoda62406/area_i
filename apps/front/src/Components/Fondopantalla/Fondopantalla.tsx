import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";

import './Fondopantalla.css'
import { OptionParticle } from "../../Helpers/OptionParticle";


const FondoPantalla = () => {
    
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log(container);
        // container?.option("background.color.value", "#000000")

    }, []);

        
    return (<Particles
        
        id="FondoParticulas" init={particlesInit}
        loaded={particlesLoaded}
        options={ OptionParticle }/> )
}

export default FondoPantalla