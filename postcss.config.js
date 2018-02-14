module.exports = {
    plugins: [
        require('precss')({
            properties: { disable: true, preserve: true }
        }),
        require('postcss-cssnext')({
            features: {
                customProperties: false
            }
        })
    ]
};
