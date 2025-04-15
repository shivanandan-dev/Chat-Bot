import { MessageSquareText } from "lucide-react";
import React from "react";

const CategoryList = ({ title, conversations }) => {
    if (!conversations.length) return null;

    return (
        <div className="mb-7">
            <p className="text-sm mb-4 text-stone-400">{title}</p>
            {conversations.map((value, index) => (
                <button key={index} className="my-2 pl-2 gap-3 flex p-1 hover:bg-stone-800 w-full text-start rounded text-sm text-stone-300 items-center">
                    <MessageSquareText size={15} />
                    {value.title}
                </button>
            ))}
        </div>
    );
};

export default CategoryList;