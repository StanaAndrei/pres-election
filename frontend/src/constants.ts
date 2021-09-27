enum LOCAL_STORAGE_KEYS {
    NAME = "PRES-ELE-NAME",
    PASSWORD = "PRES-ELE-PASSWORD"
}

const ELECTION_RESULT_IMG = 'data:image/jpeg;base64,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'

export {LOCAL_STORAGE_KEYS, ELECTION_RESULT_IMG};