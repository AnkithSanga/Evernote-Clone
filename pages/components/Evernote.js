import styles from './Evernote.module.scss';
import { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { app, database } from '../../firebaseConfig'
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
const dbInstance = collection(database, 'notes');

export default function Evernote() {
    useEffect(() => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray((data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })))
            })
    }, [])
    const getData = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray((data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })).sort())
            })
    }
    const [noteDesc, setNoteDesc] = useState('')
    const [id, setId] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isInputVisible, setInputVisible] = useState(false);
    const [note, setNote] = useState('')
    const [notesArray, setNotesArray] = useState([]);
    const addNote = () => {
        setInputVisible(true);
    }
    // console.log(note);
    const addDesc = (value) => {
        setNoteDesc(value)
    }
    const saveNote = () => {
        setNote('')
        setNoteDesc('')
        setNotesArray([...notesArray, note])

        addDoc(dbInstance, {
            note: note
        })
            .then(() => {
                getData()
            })
    }
    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)
        deleteDoc(collectionById)
        .then(()=>getData())
    }
    const getId = (id, note, noteDesc) => {
        setId(id)
        setNoteDesc(noteDesc)
        setIsUpdate(true)
        setInputVisible(true)
        setNote(note)
            .then(() => {
                getData()
            })
    }
    const editNote = () => {
        setNote('')
        const collectionById = doc(database, 'notes', id)
        updateDoc(collectionById, {
            note: note
        })
    }
    return (
        <div className={styles.mainContainer}>

            <div className={styles.btnContainer}>
                <div>
                    <button
                        onClick={addNote}
                        className={styles.button}>
                        Add a new note

                    </button>
                </div>
            </div>
            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <div>
                        <input
                            onChange={(e) => setNote(e.target.value)}
                            className={styles.addInput}
                            value={note}
                            placeholder="Enter the title " />
                        <div>
                            <div className={styles.reactquill}>
                                <ReactQuill
                                    value={noteDesc}
                                    onChange={addDesc}
                                />
                            </div>
                            {isUpdate ? (<button
                                onClick={editNote}
                                className={styles.savebtn}>
                                Edit Note
                                {/* {!isUpdate ? 'Add Note' : 'Update Note'} */}
                            </button>) :
                                (<button
                                    onClick={saveNote}
                                    className={styles.savebtn}>
                                    Save Note
                                    {/* {!isUpdate ? 'Add Note' : 'Update Note'} */}
                                </button>)
                            }
                        </div>
                    </div>
                </div>

            ) : (
                <div className={styles.newNote}>
                </div>

            )}
            <div className={styles.showNotes}>
                {notesArray.length > 0 && notesArray.map((note) => {
                    return (<div className={styles.innerNotes}>
                        <AiFillEdit onClick={getId(note.id, note.note)} size={30} className={styles.editIcon} />
                        <AiFillDelete onClick={deleteNote(note.id)} size={30} className={styles.editIcon} />
                        <p>
                            {note.note}
                        </p>
                        <div setdangerouslySetInnerHTML={{ __html: note.noteDesc }}>
                            {note.noteDesc}
                        </div>
                    </div>
                    )
                })}
            </div>

        </div>
    )
};
