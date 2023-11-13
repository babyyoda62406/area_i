import { ISourceOptions } from "tsparticles-engine";

export const OptionParticle:ISourceOptions =  {
                    
    background: {
        color: {
            value: "#071324",
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
            value: "#3e5271",
        },
        links: {
            color: "#b1b3b5",
            distance: 160,
            enable: true,
            opacity: 0.6,
            width: 2.5,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 2.3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 300,
            },
            value: 30,
        },
        opacity: {
            value: 0.5,
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
            