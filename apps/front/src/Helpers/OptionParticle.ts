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
            color: {
                value:"#e2ecf5c1"
            } ,
            distance: 250,
            enable: true,
            opacity: 0.45,
            width: 0.35,
            outModes: {
                default: "none",
              },
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: 'bounceHorizontal',
            },
            random: false,
            speed: 0.4,
            straight: true,
        },
        number: {
            density: {
                enable: true,
                area: 100,
            },
            value: 20,
        },
        opacity: {
            value: 0.1,
        },
        shape: {
            type: "bounce",
        },
        size: {
            value: { min: 1, max: 6 },
        },
        life: {
            max: Infinity,
            outMode: "none",
        },
        autoremove:false
    },
    detectRetina: true,
                 }
            