import { ISourceOptions } from "tsparticles-engine";

export const OptionParticle:ISourceOptions =  {
                    
    background: {
        color: {
            value: "#69adf6d6",
        },
    },
    
    fpsLimit: 120,
    interactivity: {
        events: {
            // onClick: {
            //     enable: true,
            //     mode: "push",
            // },
            // onHover: {
            //     enable: true,
            //     mode: "repulse",
            // },
            // resize: true,
        },
        modes: {
            // push: {
            //     quantity: 5,
            // },
            // repulse: {
            //     distance: 100,
            //     duration: 0.2,
            // },
        },
    },
    particles: {
        
        color: {
            value: "#b2c3ded4",
        },
        links: {
            color: "#e2ecf5c1",
            distance: 160,
            enable: true,
            opacity: 1.0,
            width: 3.0,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: 'bounceHorizontal',
            },
            random: true,
            speed: 0.4,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 550,
            },
            value: 65,
        },
        opacity: {
            value: 0,
        },
        shape: {
            type: "bounce",
        },
        size: {
            value: { min: 1, max: 6 },
        },
    },
    detectRetina: true,
                 }
            