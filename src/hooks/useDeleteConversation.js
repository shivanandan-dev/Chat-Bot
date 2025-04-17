import { useState } from "react";

export default function useDeleteConversation() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    async function deleteConversation(id) {
        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:4000/v1/conversations/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete conversation");
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to delete conversation");
            }

            return data;
        } catch (err) {
            setError(err.message || "An error occurred");
            throw err;
        } finally {
            setIsDeleting(false);
        }
    }

    return { deleteConversation, isDeleting, error };
}