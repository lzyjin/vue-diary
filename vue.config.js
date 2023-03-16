module.exports = {
    devServer:{
        port:8000,
        proxy:{
            '/origin':{
                target:'http://121.161.237.50:9999/origin/',
                changeOrigin:true
            },

        }
    }
}
