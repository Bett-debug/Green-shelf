import React from 'react'


export default function Modal({ open, onClose, title, children }) {
if (!open) return null
return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="bg-white rounded-lg p-4 max-w-lg w-full">
<div className="flex justify-between items-center mb-4">
<h3 className="font-semibold">{title}</h3>
<button onClick={onClose} className="text-gray-500">Close</button>
</div>
<div>{children}</div>
</div>
</div>
)
}