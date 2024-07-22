import React from 'react';
import '../styles/products.css'; // Import your CSS file

const characters = [
    {
        name: "Emily Stone",
        age: 28,
        description: "A creative graphic designer with a passion for digital art and photography.",
        image: "https://example.com/emily_stone.jpg"
    },
    {
        name: "Michael Johnson",
        age: 34,
        description: "An experienced software developer who loves coding and solving complex problems.",
        image: "https://example.com/michael_johnson.jpg"
    },
    {
        name: "Sophia Martinez",
        age: 25,
        description: "A marketing specialist with a knack for social media and content creation.",
        image: "https://example.com/sophia_martinez.jpg"
    },
    {
        name: "Daniel Smith",
        age: 40,
        description: "A seasoned project manager with a strong background in IT and business analysis.",
        image: "https://example.com/daniel_smith.jpg"
    },
    {
        name: "Isabella Brown",
        age: 22,
        description: "A recent college graduate pursuing a career in environmental science and sustainability.",
        image: "https://example.com/isabella_brown.jpg"
    },
    {
        name: "David Lee",
        age: 30,
        description: "A professional photographer with a passion for travel and capturing beautiful moments.",
        image: "https://example.com/david_lee.jpg"
    },
    {
        name: "Olivia Wilson",
        age: 27,
        description: "A talented chef specializing in vegan cuisine and healthy eating.",
        image: "https://example.com/olivia_wilson.jpg"
    },
    {
        name: "James Taylor",
        age: 36,
        description: "A financial analyst with expertise in investment strategies and market trends.",
        image: "https://example.com/james_taylor.jpg"
    },
    {
        name: "Ava Harris",
        age: 29,
        description: "An aspiring author who writes fantasy novels and short stories.",
        image: "https://example.com/ava_harris.jpg"
    }
];

const Person = ({ name, age, description, image }) => (
    <div className="character__card">
        <div className="image__size">
            <img src={image} alt="img" className='image' />
        </div>
        <hr />
        <h1 className='name'>{name} • {age} years</h1>
        <p>{description}</p>
    </div>
);

const interview = () => {
    return (
        <div className="characters-container">
            {characters.slice(0, 6).map((character, i) => (
                <div className="item">
                    <Person
                        name={character.name}
                        age={character.age}
                        description={character.description}
                        image={character.image}
                    />
                </div>
            ))}
        </div>
    );
};

export default interview;
