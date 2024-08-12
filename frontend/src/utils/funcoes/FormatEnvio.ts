export default function formatEnvio(int: number | undefined | string): number {
    if (int === undefined || int === null) {
        return 0;
    }

    let tmp = int.toString();
    tmp = tmp.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos

    if (tmp.length === 0) {
        return 0;
    }

    // Adiciona zeros à esquerda para garantir que pelo menos dois dígitos estejam presentes para os centavos
    tmp = tmp.padStart(3, '0');
    
    // Divide os números em reais e centavos
    const reais = tmp.slice(0, -2);
    const centavos = tmp.slice(-2);
    
    // Converte a string formatada em número com ponto decimal
    const formattedNumber = parseFloat(`${reais}.${centavos}`);
    
    return formattedNumber;
}
