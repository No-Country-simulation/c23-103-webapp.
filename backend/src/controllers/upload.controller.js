const { User } = require('../models');


const UploadController = {
    async uploadImage (req, res) {
        if (!req.file) {
          return res.status(400).json({ message: 'No se pudo subir la imagen' });
        }

        const userId = req.user.id;

        try {
            const imageUrl = req.file.path;
      
            const updatedUser = await User.update(
              { profileImage: imageUrl },
              { where: { id: userId } }
            );
      
            if (updatedUser[0] === 0) {
              return res.status(404).json({ message: 'Usuario no encontrado' });
            }
      
            res.status(200).json({ imageUrl: req.file.path })
      
        } catch (error) {
            console.error('Error al guardar la URL:', error);
            res.status(500).json({ message: 'Hubo un problema al guardar la URL de la imagen' });
        };
      }
};

module.exports = UploadController
