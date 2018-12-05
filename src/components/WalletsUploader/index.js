
import React from 'react'
import { Observable } from 'rxjs'
import './WalletsUploader.css'

export const WalletsUploaderID = '[WalletsUploaderID]'

const uploadFiles = files => Observable.create(observer => {
	const keys = []

	files.forEach(file => {
		const reader = new FileReader()

		reader.onload = () => {
			const key = JSON.parse(reader.result)

			keys.push(key)

			if (keys.length === files.length) {
				observer.next([...keys])
				observer.complete()
			}
		}

		reader.readAsText(file)
	})
})

export const WalletsUploader = ({ onWalletsUpload }) => (
	<input
		id={WalletsUploaderID}
		className='wallets-uploader'
		type='file'
		accept='.json'
		multiple={true}
		onChange={event => {
			const files = [...event.target.files]

			event.target.value = ''

			uploadFiles(files).subscribe(onWalletsUpload)
		}}
	/>
)