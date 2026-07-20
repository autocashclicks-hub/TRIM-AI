from insightface.app import FaceAnalysis

app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

app.prepare(ctx_id=0)


def detect_face(image):
    faces = app.get(image)

    if len(faces) == 0:
        return None

    return faces[0]


def get_face_shape(face):

    x1, y1, x2, y2 = face.bbox

    width = x2 - x1
    height = y2 - y1

    ratio = width / height

    if ratio >= 0.95:
        return "Round"

    elif ratio >= 0.88:
        return "Square"

    elif ratio >= 0.82:
        return "Oval"

    elif ratio >= 0.75:
        return "Heart"

    else:
        return "Oblong"