import { useEffect, useRef } from 'react';
import { Link, Block, Text, Flex, View } from 'vcc-ui';
import Image from 'next/image';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

interface PropsProductCard {
    data: Car;
    show?: boolean;
    handleIsVisible: (id: string) => void;
}

interface Car {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
}

export default function ProductCard({
    data,
    show,
    handleIsVisible,
}: PropsProductCard): JSX.Element {
    const { id, modelName, bodyType, modelType, imageUrl } = data;
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    const isVisible = !!entry?.isIntersecting;

    useEffect(() => {
        handleIsVisible(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    return (
        <View
            ref={ref}
            extend={{
                width: '350px',
                padding: '10px',
                '@media (min-width: 480px)': {
                    width: '25%',
                    display: show ? 'flex' : 'none',
                },
            }}
        >
            <Block
                extend={{
                    marginBottom: '20px',
                }}
            >
                <Text
                    variant="kelly"
                    subStyle="emphasis"
                    extend={{ color: '#707070', marginBottom: '6px', textTransform: 'uppercase', }}
                >
                    {bodyType}
                </Text>
                <Flex
                    extend={{
                        '@media (min-width: 1350px)': {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        },
                    }}
                >
                    <Text
                        variant="columbus"
                        subStyle="emphasis"
                        extend={{
                            '@media (min-width: 480px)': {
                                marginRight: '5px',
                            },
                            marginBottom: '6px',
                        }}
                    >
                        {modelName}
                    </Text>
                    <Text
                        variant="columbus"
                        extend={{ color: '#707070', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                        {modelType}
                    </Text>
                </Flex>
            </Block>
            <div className="card__image-wrapper">
                <Image src={imageUrl} alt={modelName} layout="fill" loading="eager" quality={100} />
            </div>
            <ul className="productCard__list">
                <li>
                    <Link href={`learn/${id}`} arrow="right">
                        LEARN
                    </Link>
                </li>
                <li>
                    <Link href={`shop/${id}`} arrow="right">
                        SHOP
                    </Link>
                </li>
            </ul>
        </View>
    );
}
