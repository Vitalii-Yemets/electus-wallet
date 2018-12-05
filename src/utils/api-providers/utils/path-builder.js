const PathPartType = {
    Base: 0,
    Param: 1
}

class PathBuilder {
    constructor(path, baseTrailingQuestionMark) {
        this._parts = {}


        if (path) {
            this.base(path, baseTrailingQuestionMark)
        }
    }

    base(path, baseTrailingQuestionMark = true) {
        this._parts = {
            ...this._parts,
            basePart: {
                type: PathPartType.Base,
                value: path
            }
        }

        this._baseTrailingQuestionMark = !!baseTrailingQuestionMark

        return this
    }

    property(name, value) {
        if (name && value) {
            this._parts = {
                ...this._parts,
                [name]: {
                    type: PathPartType.Param,
                    value
                }
            }
        }

        return this
    }

    serialize() {
        const path = Object.keys(this._parts)
            .sort((firstPart, secondPart) => {
                if (firstPart.type === PathPartType.Param && secondPart.type === PathPartType.Base) {
                    return 1
                } else if (firstPart.type === PathPartType.Base && secondPart.type === PathPartType.Param) {
                    return -1
                } else {
                    return 0
                }
            })
            .map(key => {
                switch (this._parts[key].type) {
                    case PathPartType.Base: {
                        return this._baseTrailingQuestionMark ? `/${this._parts[key].value}?` : `/${this._parts[key].value}`
                    }

                    case PathPartType.Param: {
                        return `${[key]}=${this._parts[key].value}&`
                    }

                    default: {
                        throw new Error('Unknown part type.')
                    }
                }
            })
            .reduce((parts, part) => parts += part, '')
            .replace(/&+$/, '')

        return path
    }
}

export {
    PathBuilder
}