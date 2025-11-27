use crate::configuration::Settings;
use crate::model::Product;

pub fn fetch_products(_settings: &Settings) -> Vec<Product> {
    vec![
        Product {
            id: 1,
            name: "Santa Catnip's Friend".to_string(),
            price: 9.99,
            description: "Watch your feline friend embark on a fishing adventure with Santa Catnip's Friend toy. Packed with irresistible catnip and dangling fish lure.".to_string(),
            image: "/catnip.jpg".to_string()
        },
        Product {
            id: 2,
            name: "Salty Sailor's Squeaky Squid".to_string(),
            price: 6.99,
            description: "Let your dog set sail with the Salty Sailor's Squeaky Squid. This interactive toy provides hours of fun, featuring multiple squeakers and crinkle tentacles.".to_string(),
            image: "/squid.jpg".to_string()
        },
        Product {
            id: 3,
            name: "Mermaid's Mice Trio".to_string(),
            price: 12.99,
            description: "Entertain your kitty with the Mermaid's Mice Trio. These adorable plush mice are dressed as mermaids and filled with catnip to captivate their curiosity.".to_string(),
            image: "/mermaid.jpg".to_string()
        },
        Product {
            id: 4,
            name: "Ocean Explorer's Puzzle Ball".to_string(),
            price: 11.99,
            description: "Challenge your pet's problem-solving skills with the Ocean Explorer's Puzzle Ball. This interactive toy features hidden compartments and treats, providing mental stimulation and entertainment.".to_string(),
            image: "/ocean.jpg".to_string()
        },
        Product {
            id: 5,
            name: "Pirate Parrot Teaser Wand".to_string(),
            price: 8.99,
            description: "Engage your cat in a playful pursuit with the Pirate Parrot Teaser Wand. The colorful feathers and jingling bells mimic the mischievous charm of a pirate's parrot.".to_string(),
            image: "/pirate.jpg".to_string()
        },
        Product {
            id: 6,
            name: "Seafarer's Tug Rope".to_string(),
            price: 14.99,
            description: "Tug-of-war meets nautical adventure with the Seafarer's Tug Rope. Made from marine-grade rope, it's perfect for interactive play and promoting dental health in dogs.".to_string(),
            image: "/tug.jpg".to_string()
        },
        Product {
            id: 7,
            name: "Seashell Snuggle Bed".to_string(),
            price: 19.99,
            description: "Give your furry friend a cozy spot to curl up with the Seashell Snuggle Bed. Shaped like a seashell, this plush bed provides comfort and relaxation for cats and small dogs.".to_string(),
            image: "/bed.jpg".to_string()
        },
        Product {
            id: 8,
            name: "Nautical Knot Ball".to_string(),
            price: 7.99,
            description: "Unleash your dog's inner sailor with the Nautical Knot Ball. Made from sturdy ropes, it's perfect for fetching, tugging, and satisfying their chewing needs.".to_string(),
            image: "/knot.jpg".to_string()
        },
        Product {
            id: 9,
            name: "Santa Claw's Crabby Cat Toy".to_string(),
            price: 3.99,
            description: "Watch your cat go crazy for Santa Claw's Crabby Cat Toy. This crinkly and catnip-filled toy will awaken their hunting instincts and provide endless entertainment.".to_string(),
            image: "/crabby.jpg".to_string()
        },
        Product {
            id: 10,
            name: "Ahoy Doggy Life Jacket".to_string(),
            price: 5.99,
            description: "Ensure your furry friend stays safe during water adventures with the Ahoy Doggy Life Jacket. Designed for dogs, this flotation device offers buoyancy and visibility in style.".to_string(),
            image: "/lifejacket.jpg".to_string()
        },
        Product {
            id: 11,
            name: "CloudBrew Plush Mascot".to_string(),
            price: 11.99,
            description: "Meet the CloudBrew Plush Mascot, the cutest companion for cloud enthusiasts, techies, and conference lovers alike! This limited-edition plush toy features a soft sky-blue body, fluffy cloud-foam top, and a friendly embroidered smile that instantly brightens any workspace.".to_string(),
            image: "/cloudbrew.jpg".to_string()
        },
        Product {
            id: 12,
            name: "Azura the Cloud Elephant".to_string(),
            price: 11.99,
            description: "This squishy blue elephant may look soft as a cloud, but she’s secretly on a mission: protect your sofa from unauthorized chewing attempts. Built with “infinite scaling” squeaks and “geo-redundant fluff,” Azura is ready for dogs and cats who take uptime very seriously. Perfect for snuggles, zoomies, and debugging bad moods.".to_string(),
            image: "/elephant.jpg".to_string()
        },
        Product {
            id: 13,
            name: "HotRod Racer".to_string(),
            price: 11.99,
            description: "This plush brings horsepower to nap time. Super soft exterior, high-octane fluff interior, and a squeaker that sounds like a tiny engine revving. Ideal for pets who like to zoom first and cuddle later.".to_string(),
            image: "/hotrod.jpg".to_string()
        },
        Product {
            id: 14,
            name: "Blockchain dilemma pillow".to_string(),
            price: 5.72,
            description: "Built for dogs who can’t sleep because they’re still deciding whether to put their bones on-chain. Fluffy, comfy, and ideal for long nights of overthinking complex paw-to-paw ledgers.".to_string(),
            image: "/pillow.jpg".to_string()
        }
    ]
}
