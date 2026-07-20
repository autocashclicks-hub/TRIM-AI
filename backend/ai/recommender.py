from ai.hairstyles import HAIRSTYLES


def recommend(face_shape):

    hairstyles = HAIRSTYLES.get(face_shape, HAIRSTYLES["Oval"])

    return {
        "best": hairstyles[0],
        "recommendations": hairstyles
    }