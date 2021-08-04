import React, { Children } from 'react'
import { useForm } from '@inertiajs/inertia-react'

const Label = props => <label className="block text-gray-700 text-sm font-bold mb-2">{props.children}</label>

const FormGroup = props => <div className={`px-3 ${props.className}`}>{props.children}</div>

export default function Upload() {
    const { data, setData, post, progress } = useForm({
        name: '',
        image: ''
    })

    const fileName = data.image ? data.image.name : ''

    const submit = e => {
        e.preventDefault()
        post('/reactions')
    }

    return <div className="">
        <form action="#" onSubmit={submit} className="m-4 border bg-white rounded shadow max-w-xs">
            <div className="p-4">
                <FormGroup>
                    <Label>Name</Label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Name" className="border px-2 py-1 rounded shadow " />
                </FormGroup>

                <FormGroup className="mt-4">
                    <Label>File</Label>
                    <label>
                        <div className="border border-blue-500 px-2 py-1 rounded shadow text-blue-900 cursor-pointer">
                            {fileName ? fileName : 'Select a file'}
                        </div>
                        <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                    </label>
                </FormGroup>

                <FormGroup className="mt-4">
                    <button type="submit" className="px-2 py-1 text-white bg-blue-500">Submit</button>
                </FormGroup>
            </div>
        </form>
    </div>
}