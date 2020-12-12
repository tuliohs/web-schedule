import React from "react";

// components

const defaultDescr = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp"
export const defaultStepItems = [
    {
        category: "Level One",
        items: [
            { id: 1, title: 'Personal pronouns', description: defaultDescr, priority: 'little' },
            { id: 2, title: 'This, that, these e those demonstrative pronouns.', description: defaultDescr, priority: 'little' },
            { id: 3, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' },
        ]
    },
    {
        category: "Level Two",
        items: [
            { id: 1, title: 'Personal pronouns', description: defaultDescr, priority: 'little' },
            { id: 2, title: 'This, that, these e those demonstrative pronouns.', description: defaultDescr, priority: 'little' },
            { id: 3, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' },
            { id: 4, title: 'Verbo to be', description: defaultDescr, priority: 'little' },
            { id: 5, title: 'Adjetivos: Comuns e Demonstrativos', description: defaultDescr, priority: 'little' },
            { id: 6, title: 'Advérbios de Frequência', description: defaultDescr, priority: 'little' },
            { id: 7, title: 'Comparativo e Superlativo', description: defaultDescr, priority: 'little' },
            { id: 8, title: '‘To be going to’ – frases básicas', description: defaultDescr, priority: 'little' },
            { id: 9, title: 'Quantificadores: ‘How much’, ‘how many’ e ‘very’ – frases básicas', description: defaultDescr, priority: 'little' },
            { id: 10, title: 'Substantivos Incontáveis mais Comuns', description: defaultDescr, priority: 'little' },
        ]
    },
    {
        category: "Level Three",
        items: [
            { id: 1, title: 'Personal pronouns', description: defaultDescr, priority: 'little' },
            { id: 2, title: 'This, that, these e those demonstrative pronouns.', description: defaultDescr, priority: 'little' },
            { id: 3, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' },
            { id: 4, title: 'Verbo to be', description: defaultDescr, priority: 'little' },
            { id: 5, title: 'Adjetivos: Comuns e Demonstrativos', description: defaultDescr, priority: 'little' },
        ]
    }

]

const CardContent = ({ title, description }) => {
    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">{title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{description}</p>
                </div>
            </div>
        </div>)
}


export default function Schedule() {
    return (
        <>
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                {defaultStepItems.map(c => (
                    <>
                        <div className="w-full text-center relative">
                            {/* Heading */}
                            <h6 className="text-white  uppercase font-bold  bg-blue-600 ">{c.category}</h6>
                            {/* Divider */}
                            <hr className="my-6 md:min-w-full" />
                        </div>
                        {c.items.map(x => <CardContent title={x.title} description={x.description} />)}

                    </>
                ))}
            </div>
        </>
    );
}
