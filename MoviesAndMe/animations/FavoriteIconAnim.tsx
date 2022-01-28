import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
    in_favorite: boolean;
};

export default function FavoriteIconAnim(props: Props) {
    const in_favorite = props.in_favorite;

    function _getSize() {
        return in_favorite ? 80 : 40;
    }

    const enlarge_anim = useRef(new Animated.Value(_getSize())).current;
    const should_enlarge = in_favorite ? true : false;

    function _getFavoritesImageSource() {
        switch (in_favorite) {
            case true:
                return require('../images/icon_favorite.png');
            case false:
                return require('../images/icon_favorite_border.png');
        }
    }

    useEffect(() => {
        Animated.spring(enlarge_anim, {
            toValue: should_enlarge ? 80 : 40,
            useNativeDriver: false,
        }).start();
    });

    return (
        <Animated.Image
            style={{ width: enlarge_anim, height: enlarge_anim }}
            source={_getFavoritesImageSource()}
        />
    );
}
