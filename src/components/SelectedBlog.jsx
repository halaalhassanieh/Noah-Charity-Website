import React, { useState } from 'react'

const SelectedBlog = ({ title, image, description, createdAt, updatedAt }) => {

    return (


        <div >
            <h3 className="text-2xl font-bold mb-4 text-red-wine">{title}</h3>
            {image && (
                <img
                    src={`${image}`}
                    alt={title}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                />
            )}
            <p className="text-black mb-4 w-full">{description}</p>
               <div className="text-sm text-black/60 space-y-1 mb-4">
                <p><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</p>
                <p><strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}</p>
            </div>

        </div>

    )
}

export default SelectedBlog
