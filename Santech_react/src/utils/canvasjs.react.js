var React = require('react');
var CanvasJS = require('./canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS; // Assurez-vous que CanvasJS est correctement chargé

class CanvasJSChart extends React.Component {
	static _cjsContainerId = 0  // Compteur statique pour les identifiants uniques des conteneurs de graphiques

	constructor(props) {		
		super(props);		
		this.options = props.options ? props.options : {};	// Options pour la configuration du graphique
		this.containerProps = props.containerProps ? props.containerProps : {width: "100%", position: "relative"};
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
		this.chartContainerId = "canvasjs-react-chart-container-" + CanvasJSChart._cjsContainerId++; // Création d'un ID unique pour le conteneur du graphique
	}	
	componentDidMount() {
		// Crée le graphique et le rend à l'écran dès que le composant est monté
		this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
		this.chart.render();
		
		if(this.props.onRef)
			this.props.onRef(this.chart); // Référence au graphique disponible pour le parent si nécessaire
	}	
    shouldComponentUpdate(nextProps, nextState){
		// Vérifie si les options du graphique ont changé et détermine si le composant doit être mis à jour
        return !(nextProps.options === this.options);
    }
	componentDidUpdate() {
		// Met à jour les options du graphique et le rend à nouveau
		this.chart.options = this.props.options;
		this.chart.render();
	}
	componentWillUnmount() {
		// Détruit le graphique et retire la référence lors du démontage du composant
		this.chart.destroy();
		if(this.props.onRef)
			this.props.onRef(undefined);
	}		
	render() {		
		// Rend le conteneur du graphique en utilisant React.createElement
		return <div id={this.chartContainerId} style={this.containerProps}/> // Utilisation de JSX pour simplifier la syntaxe
	}	
}

var CanvasJSReact = {
    CanvasJSChart: CanvasJSChart,
    CanvasJS: CanvasJS
};

export default CanvasJSReact; // Exportation du module pour utilisation ailleurs
