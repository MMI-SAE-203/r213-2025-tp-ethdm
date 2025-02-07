import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
        });
        data = data.map((item) => {
            item.img = pb.files.getURL(item, item.images);
            return item;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.images);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresBySurface(s) {
    const maisonSurface = await pb.collection('maison').getFullList({
        filter: `surface > ${s}`,
    });
    maisonSurface.forEach((maison) => {
        maison.img = pb.files.getURL(maison, maison.images);
    });
    return maisonSurface;
}